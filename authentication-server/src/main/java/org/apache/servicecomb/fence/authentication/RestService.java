package org.apache.servicecomb.fence.authentication;

import org.apache.camel.ProducerTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class RestService {
  @Autowired
  private ProducerTemplate producerTemplate;

  @GetMapping("/camel")
  public void camel() {
    producerTemplate.sendBody("direct:insertData", null);
  }
}
