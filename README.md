Create an image using the command

-   `docker build --tag node-docker .`

Start the container and expose port 8000 to port 8000 on the host.

-   `docker run --publish 8000:8000 --name rest-server node-docker`

Restart the container that we just stopped

-   `docker restart {container-name}`

Let’s start our application and confirm that it is running properly.
We pass the --build flag so Docker compiles our image and then starts it.

-   `docker-compose -f docker-compose.dev.yml up --build`
