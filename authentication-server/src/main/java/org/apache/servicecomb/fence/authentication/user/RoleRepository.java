package org.apache.servicecomb.fence.authentication.user;

import java.util.Set;

import org.springframework.data.jdbc.repository.query.Query;
import org.springframework.data.repository.CrudRepository;

public interface RoleRepository extends CrudRepository<Role, String> {
  @Query("select * from t_roles where user_name = :userName")
  Set<Role> selectRolesByUsername(String userName);
}
