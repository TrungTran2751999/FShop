package com.example.model;

import com.example.model.dto.AddressDTO;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
@Entity
@Table(name="address")
public class Address {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "province_id", nullable = false)
    private long provinceId;

    @Column(name = "province_name", nullable = false)
    private String provinceName;

    @Column(name = "district_id", nullable = false)
    private long districtId;

    @Column(name = "district_name", nullable = false)
    private String districtName;

    @Column(name = "ward_id", nullable = false)
    private long wardId;

    @Column(name = "ward_name", nullable = false)
    private String wardName;

    @Column(nullable = false)
    private String address;

    public AddressDTO toAddressDTO(){
        return new AddressDTO(id, provinceId, provinceName, districtId, districtName, wardId, wardName, address);
    }
}
