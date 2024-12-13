package org.apache.servicecomb.fence.resource;

import org.apache.servicecomb.fence.api.resource.UserService;
import org.apache.servicecomb.fence.entity.User;
import org.apache.servicecomb.provider.rest.common.RestSchema;
import org.springframework.beans.factory.annotation.Autowired;

@RestSchema(schemaId = "UserEndpoint", schemaInterface = UserService.class)
public class UserEndpoint implements UserService {

    @Autowired
    IUserStoreService storeService;

    @Override
    public long addUser(String userName, int age) {
        User user = new User();
        user.setUserName(userName);
        user.setAge(age);
        long count = storeService.addUser(user);
        return user.getId();
    }

    @Override
    public boolean updateUser(long id, String userName, int age) {
        User user = new User();
        user.setId(id);
        user.setUserName(userName);
        user.setAge(age);
        return storeService.updateUser(user);
    }

    @Override
    public String queryUser(long id) {
        User user = storeService.queryUser(id);
        return user == null ? "" : user.toString();
    }
}
