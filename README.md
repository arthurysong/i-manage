# iManage

iManage is a project I built at Flatiron school for the React and Redux section of the course. Using React and Redux, I wanted to build an application that hypothetically, my apartment manager could use to manage units and tenants in her apartment complex. 

iManage consists of a React front end (React files are located in /client) and Rails API back end.

Deployed Website: https://i-manage.herokuapp.com/ 

## Screenshot



## Usage





## Cloning and running the application locally:

1. Install Ruby Gems

```bash
$ bundle install
```

2. Install JS node packages (package.json is in /client folder)

```bash
$ cd client
$ npm install
```

3. Migrate and seed database. (Seeding must be executed in that order***)

```bash
$ rails db:migrate
$ rails db:seed:users
$ rails db:seed:units
$ rails db:seed:residencies
$ rails db:seed:payments_1
$ rails db:seed:payments_2
$ rails db:seed:payments_3
$ rails db:seed:payments_4
```

4. Run Rails server and React server using `rake start`

```bash
$ rake start
```

5. Navigate to localhost:3000 in your browser, login to either Luna (manager) or Nymphadora (resident).

```bash
Luna 
email: itsluna@owl.com
password: nargles

Nymphadora
email: nymphaaaa@owl.com
password: icanchange
```

Thanks for checking out my project. Any feedback is welcomed!
