package org.apache.servicecomb.fence.authentication.user;

import org.springframework.data.r2dbc.repository.Query;
import org.springframework.data.repository.reactive.ReactiveCrudRepository;

import reactor.core.publisher.Mono;

public interface TokenRepository extends ReactiveCrudRepository<Token, String> {
  @Query("""
      select token
      from t_tokens where access_token_value = :accessTokenValue""")
  Mono<String> getTokenInfoByAccessTokenId(String accessTokenValue);

  @Query("""
      select token
      from t_tokens where refresh_token_value = :refreshTokenValue""")
  Mono<String> getTokenInfoByRefreshTokenId(String refreshTokenValue);
}
