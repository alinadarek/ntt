docker build . -t dariuszmarkowski/ntt:latest --no-cache
docker push dariuszmarkowski/ntt:latest

k apply -f ntt.yaml
k expose pod ntt --port 8080
