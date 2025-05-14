package org.apache.servicecomb.fence.authentication.user;


import org.springframework.data.r2dbc.repository.Query;
import org.springframework.data.repository.reactive.ReactiveCrudRepository;

import reactor.core.publisher.Mono;

public interface UserRepository extends ReactiveCrudRepository<User, String> {
  @Query("select * from t_users where user_name = :userName")
  Mono<User> selectUserByUsername(String userName);
}
