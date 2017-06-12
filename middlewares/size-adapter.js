module.exports = function() {
    return function(req, res, next) {

        var size = req.query.size;

        if(size){
            size = size.split('x');
            req.query.w = size[0];
            req.query.h = size[1];
        }else{
            if(!req.query.h && !req.query.w){
                //the resize library fails if we don't send w or h

                if(req.query.c){
                    req.failedParams = true;
                    return res.status(400).send('In order to crop you must specify width and height');
                }

                req.query.w = 'NaN';
                req.query.h = 'Nan';
            }
        }

        next()
    }
}