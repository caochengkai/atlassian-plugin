package com.atlassian.jira.gadgets.common;

import com.atlassian.jira.charts.ChartFactory.PeriodName;
import com.atlassian.jira.config.properties.ApplicationProperties;
import com.atlassian.jira.rest.v1.model.errors.ValidationError;
import org.apache.commons.lang.StringUtils;

import java.util.Arrays;
import java.util.Collection;

/**
 * Created by ck on 2017/8/8.
 */
public class ResourceDateValidator {

  private static String MAX_DAYS_AP_PREFIX = "jira.chart.days.previous.limit.";
  private static final int INVALID_DAYS = -1;
  private final ApplicationProperties applicationProperties;

  public ResourceDateValidator(ApplicationProperties applicationProperties) {
    this.applicationProperties = applicationProperties;
  }

  public int validateDaysPrevious(String fieldName, PeriodName period, String days, Collection<ValidationError> errors) {
    int numberOfDays;
    try {
      numberOfDays = Integer.valueOf(days).intValue();
      if (numberOfDays < 0) {
        errors.add(new ValidationError(fieldName, "gadget.common.negative.days"));
      }
    } catch (NumberFormatException var7) {
      errors.add(new ValidationError(fieldName, "gadget.common.days.nan"));
      return -1;
    }

    if (numberOfDays >= 0 && period != null) {
      this.validateDaysAgainstPeriod(fieldName, period, numberOfDays, errors);
    }

    return numberOfDays;
  }

  public PeriodName validatePeriod(String fieldName, String periodName, Collection<ValidationError> errors) {
    try {
      return PeriodName.valueOf(periodName);
    } catch (IllegalArgumentException var5) {
      errors.add(new ValidationError(fieldName, "gadget.common.invalid.period"));
      return null;
    }
  }

  void validateDaysAgainstPeriod(String fieldName, PeriodName period, int days, Collection<ValidationError> errors) {
    String maxDaysPropertyKey = MAX_DAYS_AP_PREFIX + period.toString();
    String maxDaysValue = this.applicationProperties.getDefaultBackedString(maxDaysPropertyKey);
    if (StringUtils.isBlank(maxDaysValue)) {
      switch (period.ordinal()) {
        case 1:
          maxDaysValue = "10";
          break;
        case 2:
          maxDaysValue = "300";
          break;
        case 3:
          maxDaysValue = "1750";
          break;
        case 4:
          maxDaysValue = "7500";
          break;
        case 5:
          maxDaysValue = "22500";
          break;
        case 6:
          maxDaysValue = "36500";
          break;
        default:
          maxDaysValue = "300";
      }
    }

    Integer limitForPeriod = Integer.valueOf(maxDaysValue);
    if (limitForPeriod.intValue() < days) {
      errors.add(new ValidationError(fieldName, "gadget.common.days.overlimit.for.period", Arrays.asList(new String[] {limitForPeriod.toString(), period.toString()})));
    }

  }
}
