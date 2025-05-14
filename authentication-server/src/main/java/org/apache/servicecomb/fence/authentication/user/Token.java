package org.apache.servicecomb.fence.authentication.user;

import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Column;
import org.springframework.data.relational.core.mapping.Table;

@Table("t_tokens")
public class Token {
  @Id
  private long id;

  @Column("access_token_value")
  private String accessTokenValue;

  @Column("refresh_token_value")
  private String refreshTokenValue;

  private String token;

  public long getId() {
    return id;
  }

  public void setId(long id) {
    this.id = id;
  }

  public String getAccessTokenValue() {
    return accessTokenValue;
  }

  public void setAccessTokenValue(String accessTokenValue) {
    this.accessTokenValue = accessTokenValue;
  }

  public String getRefreshTokenValue() {
    return refreshTokenValue;
  }

  public void setRefreshTokenValue(String refreshTokenValue) {
    this.refreshTokenValue = refreshTokenValue;
  }

  public String getToken() {
    return token;
  }

  public void setToken(String token) {
    this.token = token;
  }
}
