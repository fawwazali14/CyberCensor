
import json
from sklearn.naive_bayes import MultinomialNB
from wordcloud import WordCloud
from sklearn.model_selection import train_test_split
import pandas as pd
from flask import Flask, request, jsonify
from sklearn.feature_extraction.text import CountVectorizer
import datetime
from flask_cors import CORS
from nltk.corpus import stopwords
from sklearn.metrics import accuracy_score



app = Flask(__name__)
CORS(app)

@app.route('/ml', methods=['POST'])
def ml():
    tweet = pd.read_csv("h.csv", encoding="ISO-8859-1")
    tweet.rename(columns={"annotation__label__-": "label", "content": "tweet"}, inplace=True)
    tweet.drop(['annotation__notes'], axis=1, inplace=True)
    tweet.drop(['extras'], axis=1, inplace=True)

    tweet['tweet'] = tweet['tweet'].apply(lambda x: " ".join(x.lower() for x in x.split()))
    # Replacement - tweet['tweet'] = tweet['tweet'].str.lower()

    tweet['tweet'] = tweet['tweet'].str.replace('[^\w\s]', '')
    # removes anything which is not letter or digit
    tweet['tweet'] = tweet['tweet'].str.replace(r'_', '')
    tweet['numerics'] = tweet['tweet'].apply(lambda x: len([x for x in x.split() if x.isdigit()]))
    tweet['tweet'] = tweet['tweet'].str.replace('[\d+]', '')
    # removes any digits from text
    stop = stopwords.words('english')
    tweet['tweet'] = tweet['tweet'].apply(lambda x: " ".join(x for x in x.split() if x not in stop))
    tweet['tweet'] = tweet['tweet'].apply(lambda x: " ".join(x for x in x.split() if len(x) > 2))

    freq = pd.Series(' '.join(tweet['tweet']).split()).value_counts()[:10]
    freq = list(freq.index)
    tweet['tweet'] = tweet['tweet'].apply(lambda x: " ".join(x for x in x.split() if x not in freq))

    bully_words = ' '.join(list(tweet[tweet['label'] == 1]['tweet']))
    non_bully_words = ' '.join(list(tweet[tweet['label'] == 0]['tweet']))
    non_bully_wc = WordCloud(width=512, height=380).generate(non_bully_words)
    X = tweet.tweet
    y = tweet.label
    X_train, X_test, y_train, y_test = train_test_split(X, y, train_size=.8, random_state=10)


    vect = CountVectorizer()

    X_train_dtm = vect.fit_transform(X_train)
    X_test_dtm = vect.transform(X_test)
    nb = MultinomialNB()
    nb.fit(X_train_dtm, y_train)
    y_pred_class = nb.predict(X_test_dtm)
    accuracy = accuracy_score(y_test, y_pred_class)
    print("Accuracy of nb:", accuracy)
    data = request.data.decode()
    print(data)
    xox=json.loads(data)
    platform = xox['platform']
    if(platform=="Twitter"):
        text = xox['text']
        sample_test = [text]
        sample_test_dtm = vect.transform(sample_test)
        a = nb.predict(sample_test_dtm)
        final = str(a[0])
        print(final)
        return jsonify({'result': final})


    elif(platform=="Youtube"):
        desp = xox['Desp']
        com = xox['Coms']
        print(com)
        st = [desp]
        sample_test_dtm = vect.transform(st)
        a = nb.predict(sample_test_dtm)
        finaldesp = str(a[0])


        com = eval(com)



        sample_test_dtm = vect.transform(com)
        a = nb.predict(sample_test_dtm)

        print(a)
        print(len(a))
        countzero= 0
        countone = 0
        for i in range(0 , len(a)):
            if(a[i]==0):
                countzero=countzero+1
            elif(a[i]==1):
                countone=countone+1



        print(countone)
        print(countzero)


        return jsonify({"desp":finaldesp,"czero":countzero,"cone":countone})





if __name__ == '__main__':
    app.run(debug=True,port=8000)