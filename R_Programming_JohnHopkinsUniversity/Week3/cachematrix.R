makeCacheMatrix <- function(x = matrix()) {
  ## x is supposed to be an invertible matrix
  ## the function returns a list of functions to
  ## 1 - set the matrix
  ## 2 - get the matrix
  ## 3 - set the inverse
  ## 4 - get the inverse
    
  inv = NULL
  set = function(y) {
    x <<- y
    inv <<- NULL
  }
  
  get = function() x
  setinv = function(inverse) inv <<- inverse 
  getinv = function() inv
  list(set=set, get=get, setinv=setinv, getinv=getinv)

}


cacheSolve <- function(x, ...) {
  ## Returns the inverse matrix of x (output of makeCacheMatrix(x) )
  
  inv = x$getinv()
  
  if (!is.null(inv)){
    message("loading cached data...")
    return(inv)
  }
  
  mat.data = x$get()
  inv = solve(mat.data, ...)
  x$setinv(inv)
  
  return(inv)
  
}
