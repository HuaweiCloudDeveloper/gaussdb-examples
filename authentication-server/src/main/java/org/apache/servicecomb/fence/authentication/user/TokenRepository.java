package org.apache.servicecomb.fence.authentication.user;

import org.springframework.data.jdbc.repository.query.Query;
import org.springframework.data.repository.CrudRepository;

public interface TokenRepository extends CrudRepository<Token, String> {
  @Query("""
      select token
      from t_tokens where access_token_value = :accessTokenValue""")
  String getTokenInfoByAccessTokenId(String accessTokenValue);

  @Query("""
      select token
      from t_tokens where refresh_token_value = :refreshTokenValue""")
  String getTokenInfoByRefreshTokenId(String refreshTokenValue);
}
