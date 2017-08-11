package com.atlassian.jira.gadgets.common;

import com.atlassian.jira.bc.issue.search.SearchService;
import com.atlassian.jira.charts.util.ChartUtils;
import com.atlassian.jira.issue.search.SearchRequest;
import com.atlassian.jira.permission.ProjectPermissions;
import com.atlassian.jira.project.Project;
import com.atlassian.jira.rest.v1.model.errors.ValidationError;
import com.atlassian.jira.security.JiraAuthenticationContext;
import com.atlassian.jira.security.PermissionManager;
import com.atlassian.jira.util.velocity.VelocityRequestContextFactory;
import org.apache.commons.lang.StringUtils;

import java.util.Collection;
import java.util.Map;

/**
 * Created by ck on 2017/8/8.
 */
public abstract class SearchQueryBackedResource extends AbstractResource {


  protected final ChartUtils chartUtils;
  protected final JiraAuthenticationContext authenticationContext;
  protected final PermissionManager permissionManager;
  private VelocityRequestContextFactory velocityRequestContextFactory;
  protected final SearchService searchService;

  public SearchQueryBackedResource(ChartUtils chartUtils, JiraAuthenticationContext authenticationContext, SearchService searchService, PermissionManager permissionManager,
      VelocityRequestContextFactory velocityRequestContextFactory) {
    this.chartUtils = chartUtils;
    this.authenticationContext = authenticationContext;
    this.searchService = searchService;
    this.permissionManager = permissionManager;
    this.velocityRequestContextFactory=velocityRequestContextFactory;
  }

  protected SearchRequest getSearchRequestAndValidate(String queryString, Collection<ValidationError> errors, Map<String, Object> params) {
    SearchRequest searchRequest;
    if (StringUtils.isNotEmpty(queryString)) {
      params.put("projectOrFilterId", queryString);
      searchRequest = this.chartUtils.retrieveOrMakeSearchRequest(queryString, params);
      this.validateParams(errors, params);
      if (!errors.isEmpty()) {
        searchRequest = null;
      }
    } else {
      errors.add(new ValidationError("projectOrFilterId", this.authenticationContext.getI18nHelper().getText("dashboard.item.error.required.query")));
      searchRequest = null;
    }

    return searchRequest;
  }

  private void validateParams(Collection<ValidationError> errors, Map<String, Object> params) {
    String queryString = (String) params.get("projectOrFilterId");
    if (queryString.startsWith("filter-")) {
      if (params.get("searchRequest") == null) {
        errors.add(new ValidationError("projectOrFilterId", this.authenticationContext.getI18nHelper().getText("dashboard.item.error.invalid.filter")));
      }
    } else if (queryString.startsWith("project-")) {
      if (params.get("project") == null) {
        errors.add(new ValidationError("projectOrFilterId", this.authenticationContext.getI18nHelper().getText("dashboard.item.error.invalid.project")));
      } else if (!this.permissionManager.hasPermission(ProjectPermissions.BROWSE_PROJECTS, (Project) params.get("project"), this.authenticationContext.getLoggedInUser())) {
        errors.add(new ValidationError("projectOrFilterId", this.authenticationContext.getI18nHelper().getText("dashboard.item.error.invalid.project")));
      }
    } else if (queryString.startsWith("jql-")) {
      if (params.get("searchRequest") == null) {
        errors.add(new ValidationError("projectOrFilterId", this.authenticationContext.getI18nHelper().getText("dashboard.item.error.invalid.jql")));
      }
    } else {
      errors.add(new ValidationError("projectOrFilterId", this.authenticationContext.getI18nHelper().getText("dashboard.item.error.invalid.projectOrFilterId")));
    }

  }

  protected String createIndexingUnavailableMessage() {
    String msg1 = this.authenticationContext.getI18nHelper().getText("dashboard.item.indexing.not.configured");
    String msg2;
    if (this.permissionManager.hasPermission(0, this.authenticationContext.getLoggedInUser())) {
      String baseUrl = this.velocityRequestContextFactory.getJiraVelocityRequestContext().getBaseUrl();
      msg2 = this.authenticationContext.getI18nHelper().getText("dashboard.item.indexing.configure", "<a href=\"" + baseUrl + "/secure/admin/jira/IndexAdmin.jspa\">", "</a>");
    } else {
      msg2 = this.authenticationContext.getI18nHelper().getText("dashboard.item.indexing.admin");
    }

    return msg1 + " " + msg2;
  }
}
