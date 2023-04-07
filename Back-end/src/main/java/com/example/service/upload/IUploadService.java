package com.example.service.upload;

import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;

public interface IUploadService {
    Map uploadImage(MultipartFile multipartFile, Map params) throws IOException;
    Map destroyImage(String pulicId, Map params) throws IOException;
}
