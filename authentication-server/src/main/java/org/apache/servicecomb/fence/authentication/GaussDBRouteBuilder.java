package org.apache.servicecomb.fence.authentication;

import org.apache.camel.builder.RouteBuilder;
import org.springframework.stereotype.Component;

@Component
public class GaussDBRouteBuilder extends RouteBuilder {
  @Override
  public void configure() throws Exception {
    from("direct:insertData")
        .setBody(constant("INSERT INTO TBL_TEST VALUES (default,10001,'Beijing','Shanghai',false)"))
        .to("jdbc:dataSource"); // spring default data source name
  }
}
