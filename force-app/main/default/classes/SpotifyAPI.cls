public with sharing class SpotifyAPI {
    
    @AuraEnabled
    public static string authenticate(String clientId, String clientSecret) {
        HttpRequest req = new HttpRequest();
        req.setEndpoint('https://accounts.spotify.com/api/token');
        req.setMethod('POST');
        System.debug(clientId);
        System.debug(clientSecret);
        Blob headerValue = Blob.valueOf(clientId + ':' + clientSecret);
        String authorizationHeader = 'Basic ' + EncodingUtil.base64Encode(headerValue);
        System.debug(authorizationHeader);
        req.setHeader('Authorization', authorizationHeader);
        req.setHeader('Content-Type', 'application/x-www-form-urlencoded');
        req.setBody('grant_type=client_credentials');
        System.debug(req);
        System.debug(req.getBody());

        Http http = new Http();
        HTTPResponse res = http.send(req);
        System.debug(res.getBody());
        return res.getBody();
    }
}
