# Store your meds with React Native and Expo

A simple application that lets you organize your medicines with React Native and Expo.

## Screenshots

<ul>
    <li>
        <p>Sign In</p>
        <img src="https://user-images.githubusercontent.com/57111920/195931479-df1b7c8c-fc1f-433b-83b3-733b63bd7b05.png" height="1024" width="512" />
    </li>
    <li>
        <p>Sign Up</p>
        <img src="https://user-images.githubusercontent.com/57111920/195931589-e590da2f-04aa-43d2-b9c5-b3ba94fc5aaa.png" height="1024" width="512" />
    </li>
    <li>
        <p>Medicine List</p>
        <ul>
            <li>
                <p>Empty</p>
                <img src="https://user-images.githubusercontent.com/57111920/195931819-bb72511e-7fc0-44c7-b50a-1cae3cf2bac9.png" height="1024" width="512" />
            </li>
            <li>
                <p>With Content</p>
                <img src="https://user-images.githubusercontent.com/57111920/195931927-9593fa88-4e6b-4aa9-b08b-9b8399ed9533.png" height="1024" width="512" />
            </li>
        </ul>
    </li>
    <li>
        <p>Add medicines</p>
        <img src="https://user-images.githubusercontent.com/57111920/195932101-94a5699b-8a9f-44f6-88ca-5d3dc9dc3d42.png" height="1024" width="512" />
    </li>
</ul>

## Getting Started

### Install Appwrite

Follow the simple [Installation Guide](https://appwrite.io/docs/installation) to get Appwrite up and running in no time. You can either deploy Appwrite on your local machine or, on any cloud provider of your choice. 

We need to make a few configuration changes to your Appwrite server.

* Go to Database and create a new Database.

![Create database](https://user-images.githubusercontent.com/57111920/195926743-00692ef4-63d1-4655-b34c-7de588fcec52.png)
* Go inside your database and create a new collection.

![Create collection](https://user-images.githubusercontent.com/57111920/195926816-e0787fd4-3c95-493f-99d9-f2030ceabe05.png)
* Add the following attributes to the collection.

![Add disease name attribute](https://user-images.githubusercontent.com/57111920/195926926-50956d56-5594-4c53-a0ca-e4c049aa98b4.png)
![Add medicines attribute](https://user-images.githubusercontent.com/57111920/195927008-6ad34b03-f695-4620-80df-d521d9648fb9.png)
![Add user id attribute](https://user-images.githubusercontent.com/57111920/195927114-fa03e21f-1aab-4851-8772-4ab65e2211fb.png)

* Go to settings and add the following permissions to your collections.

![Add permissions to collection](https://user-images.githubusercontent.com/57111920/195925270-02df0a98-3f99-49d7-b2c0-da5e6ab2c74c.png)

> Note: You would need to name the collection and attributes same as in the screenshots above.

### Run the front-end locally

You need to follow these steps to start the front end.

You will need to fill in these environment variables that help your frontend connect to Appwrite.
* BASE_URL - Your Appwrite URL
* DB_ID - Your Database ID 

Follow these instructions to run the demo app locally

```sh
$ git clone https://github.com/Neeleshrj/store-your-meds-rn.git
$ cd store-your-meds
```

Run the following command to generate your `.env` vars

```sh
$ cp .env.example .env
```

Now fill in the envrionment variables we discussed above in your `.env`

Now run the following commands to start your expo application and scan the QR code to run it on your device

```
$ yarn
$ npx expo start
```