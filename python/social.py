
import tweepy
from flask import Flask, jsonify, request
import datetime
from flask_cors import CORS
import json

from googleapiclient.discovery import build



app = Flask(__name__)
CORS(app)


@app.route('/dataa', methods=['POST'])
def data_social():

    print("Received a request to get the status text!")
    data= request.data.decode()

    json_data = json.loads(data)
    print(json_data)
    platform = json_data['platform']
    id = json_data['id']
    if(platform=="Twitter"):
        consumer_key = "KAi8jFN93D96CAUwpwtJsDl5W"
        consumer_secret = "FH45qTtGgj8bvL9a4JlHZtKvZNh0FXqSd4yT7WjqjelQbKcDzG"
        access_token = "1484587292677181441-WtLbTzL5lCyklZlcVRK27kPFXYeCyZ"
        access_token_secret = "iI3almvnTMqvi8LyoVIZHqKEk6MTeXBq1kVWufUmehArx"


        auth = tweepy.OAuthHandler(consumer_key, consumer_secret)


        auth.set_access_token(access_token, access_token_secret)


        api = tweepy.API(auth)






        status = api.get_status(id, tweet_mode='extended')


        full_text = status.full_text
        print(full_text)
        return jsonify({"text": full_text})





    elif(platform=="Youtube"):
        print("...")
        DEVELOPER_KEY = 'AIzaSyAxo0H1RshuKNpnA8Hpex0DPkII9O6z9sY'
        YOUTUBE_API_SERVICE_NAME = 'youtube'
        YOUTUBE_API_VERSION = 'v3'
        video_id = id
        youtube = build(YOUTUBE_API_SERVICE_NAME, YOUTUBE_API_VERSION, developerKey=DEVELOPER_KEY)
        comments = []
        nextPageToken = ''
        while True:
            results = youtube.commentThreads().list(
                part='snippet',
                videoId=video_id,
                pageToken=nextPageToken
            ).execute()


            nextPageToken = results.get('nextPageToken')


            for item in results['items']:
                comment = item['snippet']['topLevelComment']['snippet']['textDisplay']
                comments.append(comment)


            if not nextPageToken:
                break

        request1 = youtube.videos().list(
            part="snippet,contentDetails,statistics",
            id=video_id
        )
        response = request1.execute()
        description = response['items'][0]['snippet']['description']
        cleaned_string = description.replace("\n", "")
        obj = {"Comments": comments,"Description" : description }
        print(obj)
        no = len(comments)

        return jsonify({"Comments": comments,"Description" : cleaned_string , "Com_count" : no })


if __name__ == '__main__':
    app.run(debug=True)
