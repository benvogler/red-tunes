public with sharing class SpotifyAPI {
    
    @AuraEnabled
    public static String authenticate(String clientId, String clientSecret) {
        System.debug('authenticating');
        HttpRequest req = new HttpRequest();
        req.setEndpoint('https://accounts.spotify.com/api/token');
        req.setMethod('POST');

        Blob headerValue = Blob.valueOf(clientId + ':' + clientSecret);
        String authorizationHeader = 'Basic ' + EncodingUtil.base64Encode(headerValue);
        req.setHeader('Authorization', authorizationHeader);

        req.setHeader('Content-Type', 'application/x-www-form-urlencoded');
        req.setBody('grant_type=client_credentials');

        Http http = new Http();
        HttpResponse res = http.send(req);

        return res.getBody();
    }

    @AuraEnabled
    public static String search(String token, String query) {

        System.debug('token ' + token);
        System.debug('query ' + query);

        HttpRequest req = new HttpRequest();
        req.setEndpoint('https://api.spotify.com/v1/search?type=album,artist,track&q=' + query);
        req.setMethod('GET');
        req.setHeader('Authorization', 'Bearer ' + token);
        
        Http http = new Http();
        HttpResponse res = http.send(req);

        return res.getBody();
    }

    @AuraEnabled
    public static String play(String authorization, String uriJSON, String device) {

        HttpRequest req = new HttpRequest();
        req.setEndpoint('https://api.spotify.com/v1/me/player/play?device_id=' + device);
        req.setMethod('PUT');
        req.setBody(uriJSON);
        req.setHeader('Content-Type', 'application/json');
        req.setHeader('Authorization', 'Bearer ' + authorization);
        System.debug(req);

        Http http = new Http();
        HttpResponse res = http.send(req);

        return res.getBody();
    }
}
