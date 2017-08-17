package com.atlassian.jira.gadgets;

import com.atlassian.jira.bc.issue.search.SearchService;
import com.atlassian.jira.charts.util.ChartUtils;
import com.atlassian.jira.gadgets.common.SearchQueryBackedResource;
import com.atlassian.jira.issue.Issue;
import com.atlassian.jira.issue.index.SearchUnavailableException;
import com.atlassian.jira.issue.search.SearchRequest;
import com.atlassian.jira.project.Project;
import com.atlassian.jira.project.version.Version;
import com.atlassian.jira.project.version.VersionManager;
import com.atlassian.jira.rest.v1.model.errors.ErrorCollection.Builder;
import com.atlassian.jira.rest.v1.util.CacheControl;
import com.atlassian.jira.security.JiraAuthenticationContext;
import com.atlassian.jira.security.PermissionManager;
import com.atlassian.jira.user.ApplicationUser;
import com.atlassian.jira.util.velocity.VelocityRequestContextFactory;
import com.atlassian.plugin.spring.scanner.annotation.imports.JiraImport;
import com.atlassian.plugins.rest.common.security.AnonymousAllowed;
import org.apache.commons.lang.StringUtils;
import org.apache.commons.lang.builder.EqualsBuilder;
import org.apache.commons.lang.builder.HashCodeBuilder;
import org.apache.commons.lang.builder.ToStringBuilder;
import org.apache.commons.lang.builder.ToStringStyle;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlType;
import java.util.*;
import java.util.stream.Collectors;

/**
 * Created by ck on 2017/8/7.
 */
@Path("/planned-vs-released-chart")
@AnonymousAllowed
@Produces({MediaType.APPLICATION_JSON})
public class PlannedVsReleasedResource extends SearchQueryBackedResource {

  private VersionManager versionManager;

  public PlannedVsReleasedResource(@JiraImport ChartUtils chartUtils, @JiraImport JiraAuthenticationContext authenticationContext, @JiraImport PermissionManager permissionManager,
      @JiraImport SearchService searchService, @JiraImport VelocityRequestContextFactory velocityRequestContextFactory, @JiraImport VersionManager versionManager) {
    super(chartUtils, authenticationContext, searchService, permissionManager, velocityRequestContextFactory);
    this.versionManager = versionManager;
  }

  @GET
  @Path("/generate")
  public Response generateChart(@QueryParam("projectOrFilterId") String queryString, @QueryParam("previous") @DefaultValue("5") String previous,
      @QueryParam("period") @DefaultValue("releasedVersion") String period) {
    if (StringUtils.isNotBlank(queryString) && !queryString.contains("-")) {
      queryString = "project-" + queryString;
    }
    ArrayList errors = new ArrayList();
    ApplicationUser user = this.authenticationContext.getUser();
    HashMap params = new HashMap();
    SearchRequest searchRequest = this.getSearchRequestAndValidate(queryString, errors, params);
    if (!errors.isEmpty()) {
      return Response.status(400).entity(Builder.newBuilder(errors).build()).cacheControl(CacheControl.NO_CACHE).build();
    } else {
      try {
        Project project = (Project) params.get("project");
        Collection<Version> versions = project.getVersions();


        List<Version> filteredVersion = versions.stream().filter(version -> version.isReleased() && version.getReleaseDate() != null).sorted((o1, o2) -> {
          return o2.getReleaseDate().compareTo(o1.getReleaseDate());
        }).limit(Long.parseLong(previous)).collect(Collectors.toList());

        Collections.reverse(filteredVersion);

        List<DataRow> data = new ArrayList<DataRow>();
        filteredVersion.forEach(version -> {
          Long estimate = 0l;
          Long timeSpent = 0l;
          Collection<Issue> issuesWithFixVersion = versionManager.getIssuesWithFixVersion(version);
          for (Issue issue : issuesWithFixVersion) {
            estimate += issue.getOriginalEstimate() == null ? 0 : issue.getOriginalEstimate();
            timeSpent += issue.getTimeSpent() == null ? 0 : issue.getTimeSpent();
          }
          data.add(new DataRow(version.getName(), estimate, timeSpent));
        });
        return Response.ok(new PlannedVsReleasedChart(project.getName(), data)).cacheControl(CacheControl.NO_CACHE).build();
      } catch (SearchUnavailableException var32) {
        if (!var32.isIndexingEnabled()) {
          return this.createIndexingUnavailableResponse(this.createIndexingUnavailableMessage());
        } else {
          throw var32;
        }
      }
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
    @XmlElement
    private String label;
    @XmlElement
    private Long estimate;
    @XmlElement
    private Long timeSpent;

    public DataRow() {}

    public DataRow(String label, Long estimate, Long timeSpent) {
      this.label = label;
      this.estimate = estimate;
      this.timeSpent = timeSpent;
    }

    public String getLabel() {
      return label;
    }

    public DataRow setLabel(String label) {
      this.label = label;
      return this;
    }

    public Long getEstimate() {
      return estimate;
    }

    public DataRow setEstimate(Long estimate) {
      this.estimate = estimate;
      return this;
    }

    public Long getTimeSpent() {
      return timeSpent;
    }

    public DataRow setTimeSpent(Long timeSpent) {
      this.timeSpent = timeSpent;
      return this;
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
    private String projectName;
    @XmlElement
    private List<DataRow> data;

    private PlannedVsReleasedChart() {}

    public PlannedVsReleasedChart(String projectName, List<DataRow> data) {
      this.projectName = projectName;
      this.data = data;
    }

    public String getProjectName() {
      return projectName;
    }

    public PlannedVsReleasedChart setProjectName(String projectName) {
      this.projectName = projectName;
      return this;
    }

    public List<DataRow> getData() {
      return data;
    }

    public PlannedVsReleasedChart setData(List<DataRow> data) {
      this.data = data;
      return this;
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
