function createStorage() {
	let countries = [];
	return {
		setCountriesBackup: newCountries => countries = newCountries,
		getCountriesBackup: () => countries
	};
}

const tableCountries = createStorage();
const tableElement = document.createElement('table');
const thead = `<thead><tr><td>Name</td><td>Capital</td><td>Population</td><td>Area</td></tr></thead>`;

tableElement.className = 'mt-3 table table-striped table-bordered  countries-table';

fetch('https://restcountries.com/v2/all').then(res => res.json()).then(data => {
	const selectedCountries = data.map(country => ({
		name: country.name,
		population: country.population,
		area: country.area,
		region: country.region,
	}));
	tableCountries.setCountriesBackup(selectedCountries);
	renderCountries(selectedCountries);
})
function renderCountries(getCountries) {
	const createHtml = getCountries.reduce((countries, country) => {
		return countries += `
			<tr>
				<td>${country.name}</td>
				<td>${country.region}</td>
				<td>${country.population}</td>
				<td>${country.area}</td>
			</tr>
		`
	}, '');
	document.querySelector(".container").append(tableElement);
	tableElement.innerHTML = thead + createHtml;
}

function filteredCountries(valueSearch) {
	const countries = tableCountries.getCountriesBackup();
	const result = countries.filter(country => country.name.toLowerCase().indexOf(valueSearch) >= 0);
	document.querySelector('#search-btn').onclick = () => {
		renderCountries(result);
	};
	document.querySelector('#clear-btn').onclick = () => {
		document.querySelector('#search').value = '';
		renderCountries(countries);
	}
}


document.querySelector('#search').value = '';
document.querySelector('#search').onkeyup = e => {
	const valueSearch = e.currentTarget.value.trim().toLowerCase();
	filteredCountries(valueSearch);
}

