package org.apache.servicecomb.fence.authentication.user;

import org.springframework.data.r2dbc.repository.Query;
import org.springframework.data.repository.reactive.ReactiveCrudRepository;

import reactor.core.publisher.Flux;

public interface RoleRepository extends ReactiveCrudRepository<Role, String> {
  @Query("select * from t_roles where user_name = :userName")
  Flux<Role> selectRolesByUsername(String userName);
}
