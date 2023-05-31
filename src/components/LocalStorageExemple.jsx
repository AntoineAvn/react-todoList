function LocalStorageExemple() {

    localStorage.clear();

    const ls = localStorage;

    ls.setItem('key1', 'value1');
    ls.setItem('key2', 'value2');
    ls.setItem('key3', 'value3');
    ls.removeItem('key1');

    return (
        <div>
            <span>LocalStorage :</span>
            <ul>
                {Object.keys(ls).map((key) => (
                    <li> {key} : {ls.getItem(key)}</li>
                ))}
            </ul>

            <p>Valeur de "Key2" : {ls.getItem('key2')}</p>
        </div>
    );
}

export default LocalStorageExemple;