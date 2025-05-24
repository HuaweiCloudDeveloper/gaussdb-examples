package org.apache.servicecomb.fence.authentication.user;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "t_tokens")
public class Token {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private long id;

  @Column(name = "access_token_value")
  private String accessTokenValue;

  @Column(name = "refresh_token_value")
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
