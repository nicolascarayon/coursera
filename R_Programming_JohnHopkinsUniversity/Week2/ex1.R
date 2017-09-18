pollutantmean <- function(directory, pollutant, id = 1:332){
  #csvFiles <- list.files(path = directory)
  for (i in id)
  {
    read.csv(directory + str(i) + ".csv")
    
  }
  
}


pollutantmean("C:\\Users\\CARAYON\\Google Drive\\Cours\\Coursera\\John Hopkins University\\Week2\\specdata")
