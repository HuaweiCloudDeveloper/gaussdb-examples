package org.apache.servicecomb.fence.api.resource;

import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

@RequestMapping(path = "/v1/user/method")
public interface UserService {
    @RequestMapping(path = "/add", produces = MediaType.APPLICATION_JSON_VALUE)
    long addUser(@RequestParam(name = "userName") String userName, @RequestParam(name = "age") int age);

    @RequestMapping(path = "/update", produces = MediaType.APPLICATION_JSON_VALUE)
    boolean updateUser(@RequestParam(name = "id") long id, String userName, int age);

//    @RequestMapping(path = "/query", produces = MediaType.APPLICATION_JSON_VALUE)
//    @ResponseBody
//    String queryUser(@RequestParam(name = "id") long id);
    @RequestMapping("/query/{id}")
    @ResponseBody
    String queryUser(@PathVariable long id);
}

