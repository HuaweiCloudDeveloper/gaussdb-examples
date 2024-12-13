package org.apache.servicecomb.fence.mapper;

import org.apache.ibatis.annotations.*;
import org.apache.servicecomb.fence.entity.User;

@Mapper
public interface IUserMapper {

    @Options(useGeneratedKeys = true, keyProperty = "id", keyColumn = "id")
    @Insert("insert into T_USER_TEST(USER_NAME, AGE) values(#{userName}, #{age})")
    int save(User user);

    @Update("update T_USER_TEST set USER_NAME = #{userName},age = #{age} where id = #{id}")
    int update(User user);

    @Select("select * from T_USER_TEST where ID = #{id}")
    @Results(@Result(property = "userName", column = "USER_NAME"))
    User queryById(long id);
}
