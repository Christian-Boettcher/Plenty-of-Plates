package com.techelevator.business;

import com.techelevator.exceptions.SearchFailedException;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.net.URI;
import java.net.URISyntaxException;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.Scanner;

@Service
public class YelpAPIService {
    /** this service class connects to Yelp's external API, allowing us to use our own controller as a proxy
     * because YELP does not allow calls to their API from javascript/front end applications */

    private final String yelpBaseUrl = "https://api.yelp.com/v3/businesses/";
    String bearerToken = "Bearer ";

    public void getbearerToken() throws FileNotFoundException
    {
        try
        {
            Scanner txtIn = new Scanner(new File(System.getProperty("user.dir")+"\\YELP_API_TOKEN.txt"));
            while (txtIn.hasNext())
            {
                this.bearerToken += txtIn.next();
            }
            txtIn.close();
        }
        catch (FileNotFoundException e) 
        {
            throw new FileNotFoundException();
        }
    }

    public String searchRestaurantsByLocation(String location) throws SearchFailedException{

        try {
            getbearerToken();

            HttpClient httpClient = HttpClient.newHttpClient();

            HttpRequest searchRequest = HttpRequest.newBuilder()
                    .uri(new URI(yelpBaseUrl + "search?location=" + location))
                    .header("Authorization", bearerToken)
                    .build();

            HttpResponse<String> searchResponse = httpClient.send(searchRequest, HttpResponse.BodyHandlers.ofString());

            return searchResponse.body();
        } catch (URISyntaxException | InterruptedException | IOException e) {
            throw new SearchFailedException();
        }
    }

    public String getRestaurantById(String restaurantId) throws SearchFailedException {
        try {
            getbearerToken();

            HttpClient httpClient = HttpClient.newHttpClient();

            HttpRequest getRequest = HttpRequest.newBuilder()
                    .uri(new URI(yelpBaseUrl + restaurantId))
                    .header("Authorization", bearerToken)
                    .build();

            HttpResponse<String> getResponse = httpClient.send(getRequest, HttpResponse.BodyHandlers.ofString());

            return getResponse.body();
        } catch (URISyntaxException | IOException | InterruptedException e) {
            throw new SearchFailedException();
        }
    }
}
