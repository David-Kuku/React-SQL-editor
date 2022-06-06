## To start, run <br>
#### "npm install" to install all needed packages, then <br>
#### "npm start"

#### The page load time was calculated using the google chrome lighthouse extension as shown in the picture below and is given by the "time to interactive" value.

![Screenshot (614)](https://user-images.githubusercontent.com/61375682/172171811-790821c5-b6f8-49f0-8055-df565a208fdc.png)


#### I optimized the page load time by basically using react-lazy for code-splitting.
#### I also used React.memo, useMemo and the useCallback hooks to optimize the general performance of the app.

### Predefined Queries I had
select * from customers
select * from categories,
select * from customers,
select * from employee_territories,
select * from employees,
select * from order_details,
select * from orders,
select * from products,
select * from regions,
select * from shippers,
select * from suppliers,
select * from territories,
select * from contacts
