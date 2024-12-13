package org.apache.servicecomb.fence.resource;

import org.apache.servicecomb.fence.entity.User;
import org.apache.servicecomb.fence.mapper.IUserMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class UserStoreService implements IUserStoreService {
    private static final Logger LOG = LoggerFactory.getLogger(UserStoreService.class);

    @Autowired
    private IUserMapper userMapper;

    @Override
    public long addUser(User user) {
        LOG.info("add user:{}", user);
        return userMapper.save(user);
    }

    @Override
    public boolean updateUser(User user) {
        LOG.info("update user:{}", user);
        User _user = this.queryUser(user.getId());
        if (_user == null) {
            LOG.debug("未找到该对象{},请新增后更新", user.getId());
            return false;
        }
        if (!user.getUserName().equals(_user.getUserName()))
            _user.setUserName(user.getUserName());
        if (user.getAge() != 0 && user.getAge() != _user.getAge())
            _user.setAge(user.getAge());
        return userMapper.update(_user) == 1;
    }

    @Override
    public User queryUser(long id) {
        LOG.info("query user id:{}", id);
        if (0 == id) return null;
        return userMapper.queryById(id);
    }
}
