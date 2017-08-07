package com.atlassian.tutorial.api;

import com.atlassian.plugins.rest.common.security.AnonymousAllowed;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by ck on 2017/8/7.
 */
@Path("/planned-vs-released-chart")
@AnonymousAllowed
@Produces({MediaType.APPLICATION_JSON})
public class PlannedVsReleasedChart {
  @GET
  @Path("/generate")
  public Response generate(@QueryParam("projectId") String projectIdString) {
    List test=new ArrayList();
    test.add(1);
    test.add(2);
    return Response.ok(test).build();
  }
}
