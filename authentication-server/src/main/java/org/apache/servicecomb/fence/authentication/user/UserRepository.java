package org.apache.servicecomb.fence.authentication.user;

import org.springframework.data.jdbc.repository.query.Query;
import org.springframework.data.repository.CrudRepository;

public interface UserRepository extends CrudRepository<User, String> {
  @Query("select * from t_users where user_name = :userName")
  User selectUserByUsername(String userName);
}
