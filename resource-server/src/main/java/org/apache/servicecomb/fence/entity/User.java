package org.apache.servicecomb.fence.entity;


import lombok.Data;

import java.io.Serializable;

@Data
public class User implements Serializable {
    private Long id;
    private String userName;
    private int age;
}
