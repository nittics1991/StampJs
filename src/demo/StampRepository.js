/**
*   StampRepository
*
*   @param string namespace
*/
let StampRepository = function(namespace){
    this._namespace = namespace;
};

/**
*   save
*
*   @param string id
*   @param string content
*/
StampRepository.prototype.save = function(id, dataset) {
    window.localStorage.setItem(
        this._resolveId(id),
        JSON.stringify(dataset)
    );
};

/**
*   remove
*
*   @param string id
*   @param string content
*/
StampRepository.prototype.remove = function(id) {
    window.localStorage.removeItem(
        this._resolveId(id)
    );
};

/**
*   load
*
*   @param string id
*   @return object
*/
StampRepository.prototype.load = function(id) {
    return JSON.parse(
        window.localStorage.getItem(
            this._resolveId(id)
        )
    );
};

/**
*   resolveId
*
*   @param string id
*   @return string
*/
StampRepository.prototype._resolveId = function(id) {
    return this._namespace + '_' + id;
};
