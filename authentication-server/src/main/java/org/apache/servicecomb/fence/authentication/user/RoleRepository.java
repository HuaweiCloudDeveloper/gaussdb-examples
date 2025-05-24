package org.apache.servicecomb.fence.authentication.user;

import java.util.Set;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

public interface RoleRepository extends CrudRepository<Role, String> {
  @Query("select r from Role r where userName = ?1")
  Set<Role> selectRolesByUsername(String userName);
}
