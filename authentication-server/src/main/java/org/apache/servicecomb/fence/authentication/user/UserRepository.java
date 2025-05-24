package org.apache.servicecomb.fence.authentication.user;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface UserRepository extends JpaRepository<User, String> {
  @Query("select u from User u where userName = ?1")
  User selectUserByUsername(String userName);
}
