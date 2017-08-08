package com.atlassian.jira.gadgets.common;

import com.atlassian.jira.rest.api.messages.TextMessage;
import com.atlassian.jira.rest.v1.model.errors.ErrorCollection;
import com.atlassian.jira.rest.v1.model.errors.ValidationError;
import com.atlassian.jira.rest.v1.util.CacheControl;

import javax.ws.rs.core.Response;
import java.util.Collection;
import java.util.HashSet;

/**
 * Created by ck on 2017/8/8.
 */
public abstract class AbstractResource {
  public AbstractResource() {}

  protected Response createErrorResponse(Collection<ValidationError> errors) {
    return Response.status(400).entity(ErrorCollection.Builder.newBuilder(errors).build()).cacheControl(CacheControl.NO_CACHE).build();
  }

  protected Response createIndexingUnavailableResponse(String message) {
    HashSet<String> messages = new HashSet<String>();
    messages.add(message);
    return Response.status(503).entity(ErrorCollection.Builder.newBuilder(messages).build()).cacheControl(CacheControl.NO_CACHE).build();
  }

  protected Response createValidationResponse(Collection<ValidationError> errors) {
    return errors.isEmpty() ? Response.ok(new TextMessage("No input validation errors found.")).cacheControl(CacheControl.NO_CACHE).build() : this.createErrorResponse(errors);
  }
}
