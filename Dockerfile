FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build-env
WORKDIR /app
EXPOSE 8080

#copy .csproj and restore as distinct layers
COPY "sewmuchfun.sln" "sewmuchfun.sln"
COPY "API/API.csproj" "API/API.csproj"

RUN dotnet restore "sewmuchfun.sln"

COPY . .
RUN dotnet publish -c Release -o out

# build a runtime image
FROM mcr.microsoft.com/dotnet/aspnet:6.0
WORKDIR /app
COPY --from=build-env /app/out .
ENTRYPOINT ["dotnet", "API.dll"]
