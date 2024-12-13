package org.apache.servicecomb.fence.resource;

import org.apache.servicecomb.fence.entity.User;

public interface IUserStoreService {
    long addUser(User user);
    boolean updateUser(User user);
    User queryUser(long id);
}
