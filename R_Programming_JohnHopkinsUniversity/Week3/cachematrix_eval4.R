## Put comments here that give an overall description of what your
## functions do

## This function creates a list with the methods set,get,setInverse, getInverse and returns it

makeCacheMatrix <- function(x = matrix()) 
{
  inverse <- NULL 
  set <- function(y) {
    x <<- y
    inverse <<- NULL
  }
  
  
  get <- function() x
  setInverse <- function(n) inverse <<- n
  getInverse <- function() inverse
  list(set=set, get=get, setInverse=setInverse, getInverse=getInverse)
}


## Checks if the inverse cache exists or not, otherwise caches it.

cacheSolve <- function(x, ...) {
  inverse <- x$getInverse()
  if(!is.null(inverse)) {
    message("getting cached data")
    return(inverse)
  }
  data <- x$get()
  inverse <- solve(data)
  x$setInverse(inverse)
  inverse
  ## Return a matrix that is the inverse of 'x'
}