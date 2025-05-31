from mongoengine import Document, StringField
from mongodbClient import dbConnect


class Test(Document):
    message = StringField()


def testfun():
    try:
        Test.objects.first()
        print("✅ MongoEngine is connected and operational.")
    except Exception as e:
        print(f"❌ MongoEngine connection failed: {e}")
