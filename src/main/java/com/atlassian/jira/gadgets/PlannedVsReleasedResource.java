package com.atlassian.jira.gadgets;

import com.atlassian.jira.bc.issue.search.SearchService;
import com.atlassian.jira.charts.Chart;
import com.atlassian.jira.charts.ChartFactory;
import com.atlassian.jira.charts.ChartFactory.ChartContext;
import com.atlassian.jira.charts.ChartFactory.PeriodName;
import com.atlassian.jira.charts.ChartFactory.VersionLabel;
import com.atlassian.jira.charts.jfreechart.TimePeriodUtils;
import com.atlassian.jira.charts.util.ChartUtils;
import com.atlassian.jira.config.properties.ApplicationProperties;
import com.atlassian.jira.gadgets.common.ResourceDateValidator;
import com.atlassian.jira.gadgets.common.SearchQueryBackedResource;
import com.atlassian.jira.issue.index.SearchUnavailableException;
import com.atlassian.jira.issue.search.SearchRequest;
import com.atlassian.jira.rest.v1.model.errors.ErrorCollection.Builder;
import com.atlassian.jira.rest.v1.model.errors.ValidationError;
import com.atlassian.jira.rest.v1.util.CacheControl;
import com.atlassian.jira.security.JiraAuthenticationContext;
import com.atlassian.jira.security.PermissionManager;
import com.atlassian.jira.timezone.TimeZoneManager;
import com.atlassian.jira.user.ApplicationUser;
import com.atlassian.jira.util.velocity.VelocityRequestContextFactory;
import com.atlassian.plugin.spring.scanner.annotation.imports.ComponentImport;
import com.atlassian.plugins.rest.common.security.AnonymousAllowed;
import org.apache.commons.lang.StringUtils;
import org.apache.commons.lang.builder.EqualsBuilder;
import org.apache.commons.lang.builder.HashCodeBuilder;
import org.apache.commons.lang.builder.ToStringBuilder;
import org.apache.commons.lang.builder.ToStringStyle;
import org.jfree.chart.urls.XYURLGenerator;
import org.jfree.data.category.CategoryDataset;
import org.jfree.data.time.RegularTimePeriod;
import org.jfree.data.xy.XYDataset;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlType;
import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;

/**
 * Created by ck on 2017/8/7.
 */
@Path("/planned-vs-released-chart")
@AnonymousAllowed
@Produces({MediaType.APPLICATION_JSON})
public class PlannedVsReleasedResource extends SearchQueryBackedResource {

  public static final String DAYS_NAME = "daysprevious";
  private static final String PERIOD_NAME = "periodName";
  public static final String VERSION_LABEL = "versionLabel";
  private static final String IS_CUMULATIVE = "isCumulative";
  private static final String SHOW_UNRESOLVED_TREND = "showUnresolvedTrend";
  private static final String WIDTH = "width";
  private static final String HEIGHT = "height";
  private static final String NUM_CREATED_ISSUES = "numCreatedIssues";
  private static final String RETURN_DATA = "returnData";
  private static final String NUM_RESOLVED_ISSUES = "numResolvedIssues";
  private static final String INLINE = "inline";
  private final ChartFactory chartFactory;
  private final ResourceDateValidator resourceDateValidator;
  private final TimeZoneManager timeZoneManager;

  public PlannedVsReleasedResource(@ComponentImport ChartFactory chartFactory, @ComponentImport ChartUtils chartUtils,
      @ComponentImport JiraAuthenticationContext authenticationContext, @ComponentImport PermissionManager permissionManager, @ComponentImport SearchService searchService,
      @ComponentImport VelocityRequestContextFactory velocityRequestContextFactory, @ComponentImport ApplicationProperties applicationProperties,
      @ComponentImport TimeZoneManager timeZoneManager) {
    super(chartUtils, authenticationContext, searchService, permissionManager, velocityRequestContextFactory);
    this.chartFactory = chartFactory;
    this.timeZoneManager = timeZoneManager;
    this.resourceDateValidator = new ResourceDateValidator(applicationProperties);
  }

  @GET
  @Path("/generate")
  public Response generateChart(@QueryParam("projectOrFilterId") String queryString,
      @QueryParam("daysprevious") @DefaultValue("30") String days, @QueryParam("periodName") @DefaultValue("daily") String periodName,
      @QueryParam("versionLabel") @DefaultValue("major") String versionLabel, @QueryParam("isCumulative") @DefaultValue("true") boolean isCumulative,
      @QueryParam("showUnresolvedTrend") @DefaultValue("false") boolean showUnresolvedTrend, @QueryParam("returnData") @DefaultValue("false") boolean returnData,
      @QueryParam("width") @DefaultValue("450") int width, @QueryParam("height") @DefaultValue("300") int height, @QueryParam("inline") @DefaultValue("false") boolean inline) {
    if (StringUtils.isNotBlank(queryString) && !queryString.contains("-")) {
      queryString = "filter-" + queryString;
    }

    ArrayList errors = new ArrayList();
    ApplicationUser user = this.authenticationContext.getUser();
    HashMap params = new HashMap();
    SearchRequest searchRequest = this.getSearchRequestAndValidate(queryString, errors, params);
    PeriodName period = this.resourceDateValidator.validatePeriod("periodName", periodName, errors);
    int numberOfDays = this.resourceDateValidator.validateDaysPrevious("daysprevious", period, days, errors);
    VersionLabel label = this.validateVersionLabel(versionLabel, errors);
    if (!errors.isEmpty()) {
      return Response.status(400).entity(Builder.newBuilder(errors).build()).cacheControl(CacheControl.NO_CACHE).build();
    } else {
      ChartContext context = new ChartFactory.ChartContext(user, searchRequest, width, height, inline);

      try {
        Chart e = this.chartFactory.generateCreatedVsResolvedChart(context, numberOfDays, period, label, isCumulative, showUnresolvedTrend);
        String location = e.getLocation();
        String title = this.getFilterTitle(params);
        String filterUrl = this.getFilterUrl(params);
        Integer issuesCreated = (Integer) e.getParameters().get("numCreatedIssues");
        Integer issuesResolved = (Integer) e.getParameters().get("numResolvedIssues");
        String imageMap = e.getImageMap();
        String imageMapName = e.getImageMapName();
        PlannedVsReleasedResource.DataRow[] data = null;
        if (returnData) {
          CategoryDataset createdVsResolvedChart = (CategoryDataset) e.getParameters().get("completeDataset");
          XYDataset chartDataset = (XYDataset) e.getParameters().get("chartDataset");
          XYURLGenerator completeUrlGenerator = (XYURLGenerator) e.getParameters().get("completeDatasetUrlGenerator");
          data = this.generateDataSet(createdVsResolvedChart, completeUrlGenerator, chartDataset, showUnresolvedTrend);
        }

        PlannedVsReleasedResource.PlannedVsReleasedChart createdVsResolvedChart1 = new PlannedVsReleasedResource.PlannedVsReleasedChart(location, title, filterUrl,
            issuesCreated.intValue(), issuesResolved.intValue(), imageMap, imageMapName, data, width, height, e.getBase64Image());
        return Response.ok(createdVsResolvedChart1).cacheControl(CacheControl.NO_CACHE).build();
      } catch (SearchUnavailableException var32) {
        if (!var32.isIndexingEnabled()) {
          return this.createIndexingUnavailableResponse(this.createIndexingUnavailableMessage());
        } else {
          throw var32;
        }
      }
    }
  }

  private PlannedVsReleasedResource.DataRow[] generateDataSet(CategoryDataset dataset, XYURLGenerator urlGenerator, XYDataset chartdataset, boolean showTrend) {
    TimePeriodUtils timePeriodUtils = new TimePeriodUtils(this.timeZoneManager);
    PlannedVsReleasedResource.DataRow[] data = new PlannedVsReleasedResource.DataRow[dataset.getColumnCount()];

    for (int col = 0; col < dataset.getColumnCount(); ++col) {
      Object key = dataset.getColumnKey(col);
      if (key instanceof RegularTimePeriod) {
        key = timePeriodUtils.prettyPrint((RegularTimePeriod) key);
      }

      int createdVal = dataset.getValue(0, col).intValue();
      String createdUrl = urlGenerator.generateURL(chartdataset, 0, col);
      int resolvedVal = dataset.getValue(1, col).intValue();
      String resolvedUrl = urlGenerator.generateURL(chartdataset, 1, col);
      Integer trendCount = null;
      if (showTrend) {
        trendCount = Integer.valueOf(dataset.getValue(2, col).intValue());
      }

      data[col] = new PlannedVsReleasedResource.DataRow(key, createdUrl, createdVal, resolvedUrl, resolvedVal, trendCount);
    }

    return data;
  }

  private VersionLabel validateVersionLabel(String versionLabel, Collection<ValidationError> errors) {
    try {
      return VersionLabel.valueOf(versionLabel);
    } catch (IllegalArgumentException var4) {
      errors.add(new ValidationError("versionLabel", "gadget.created.vs.resolved.invalid.version.label"));
      return null;
    }
  }

  @GET
  @Path("/validate")
  public Response validateChart(@QueryParam("projectOrFilterId") String queryString) {
    if (StringUtils.isNotBlank(queryString) && !queryString.contains("-")) {
      queryString = "filter-" + queryString;
    }
    ArrayList errors = new ArrayList();
    HashMap params = new HashMap();
    this.getSearchRequestAndValidate(queryString, errors, params);
    return this.createValidationResponse(errors);
  }

  @XmlRootElement
  @XmlType(namespace = "com.atlassian.jira.gadgets.PlannedVsReleasedResource")
  public static class DataRow {
    private Object key;
    @XmlElement
    private String createdUrl;
    @XmlElement
    private int createdValue;
    @XmlElement
    private String resolvedUrl;
    @XmlElement
    private int resolvedValue;
    @XmlElement
    private Integer trendCount;
    @XmlElement(name = "key")
    private String keyString;

    public DataRow() {}

    DataRow(Object key, String createdUrl, int createdValue, String resolvedUrl, int resolvedValue, Integer trendCount) {
      this.key = key;
      this.createdUrl = createdUrl;
      this.createdValue = createdValue;
      this.resolvedUrl = resolvedUrl;
      this.resolvedValue = resolvedValue;
      this.trendCount = trendCount;
      this.keyString = key.toString();
    }

    public String getKey() {
      return this.key.toString();
    }

    public Object getRawKey() {
      return this.key;
    }

    public String getCreatedUrl() {
      return this.createdUrl;
    }

    public int getCreatedValue() {
      return this.createdValue;
    }

    public String getResolvedUrl() {
      return this.resolvedUrl;
    }

    public int getResolvedValue() {
      return this.resolvedValue;
    }

    public Integer getTrendCount() {
      return this.trendCount;
    }

    public int hashCode() {
      return HashCodeBuilder.reflectionHashCode(this);
    }

    public boolean equals(Object o) {
      return EqualsBuilder.reflectionEquals(this, o);
    }

    public String toString() {
      return ToStringBuilder.reflectionToString(this, ToStringStyle.SHORT_PREFIX_STYLE);
    }
  }

  @XmlRootElement
  public static class PlannedVsReleasedChart {
    @XmlElement
    private String location;
    @XmlElement
    private String filterTitle;
    @XmlElement
    private String filterUrl;
    @XmlElement
    private int issuesCreated;
    @XmlElement
    private int issuesResolved;
    @XmlElement
    private String imageMap;
    @XmlElement
    private String imageMapName;
    @XmlElement
    private PlannedVsReleasedResource.DataRow[] data;
    @XmlElement
    private int width;
    @XmlElement
    private int height;
    @XmlElement
    protected String base64Image;

    private PlannedVsReleasedChart() {}

    PlannedVsReleasedChart(String location, String filterTitle, String filterUrl, int issuesCreated, int issuesResolved, String imageMap, String imageMapName,
        PlannedVsReleasedResource.DataRow[] data, int width, int height, String base64Image) {
      this.location = location;
      this.filterTitle = filterTitle;
      this.filterUrl = filterUrl;
      this.issuesCreated = issuesCreated;
      this.issuesResolved = issuesResolved;
      this.imageMap = imageMap;
      this.imageMapName = imageMapName;
      this.data = data;
      this.width = width;
      this.height = height;
      this.base64Image = base64Image;
    }

    public String getLocation() {
      return this.location;
    }

    public String getFilterTitle() {
      return this.filterTitle;
    }

    public String getFilterUrl() {
      return this.filterUrl;
    }

    public int getIssuesCreated() {
      return this.issuesCreated;
    }

    public int getIssuesResolved() {
      return this.issuesResolved;
    }

    public String getImageMap() {
      return this.imageMap;
    }

    public String getImageMapName() {
      return this.imageMapName;
    }

    public PlannedVsReleasedResource.DataRow[] getData() {
      return this.data;
    }

    public int getWidth() {
      return this.width;
    }

    public int getHeight() {
      return this.height;
    }

    public int hashCode() {
      return HashCodeBuilder.reflectionHashCode(this);
    }

    public boolean equals(Object o) {
      return EqualsBuilder.reflectionEquals(this, o);
    }

    public String toString() {
      return ToStringBuilder.reflectionToString(this, ToStringStyle.SHORT_PREFIX_STYLE);
    }
  }
}
