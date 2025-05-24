package org.apache.servicecomb.fence.authentication.user;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface TokenRepository extends JpaRepository<Token, String> {
  @Query("""
      select token
      from Token where accessTokenValue = ?1""")
  String getTokenInfoByAccessTokenId(String accessTokenValue);

  @Query("""
      select token
      from Token where refreshTokenValue = ?1""")
  String getTokenInfoByRefreshTokenId(String refreshTokenValue);
}
