package com.example.service.upload;

import com.cloudinary.Cloudinary;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;
@Service
public class UploadService implements IUploadService{
    @Autowired
    private Cloudinary cloudinary;
    @Override
    public Map uploadImage(MultipartFile multipartFile, Map option) throws IOException {
        return cloudinary.uploader().upload(multipartFile.getBytes(), option);
    }

    @Override
    public Map destroyImage(String pulicId, Map option) throws IOException {
        return cloudinary.uploader().destroy(pulicId,option);
    }
}
