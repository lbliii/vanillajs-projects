const numbers = [1,2,3]

// SET solution: 
// Transform the array into a set and check if the size of the set is the same as the array length.

var containsDuplicate = function(nums) { 
    return (new Set(nums)).size !== nums.length; // return true if there are duplicates
};

/* var containsDuplicate = function(nums) {
    let hashMap = {}; 
  
    
    for(let i=0;i<nums.length;i++){ 
        if(hashMap[nums[i]]){ // if the value is already in the hashmap
            return true;

        }else{
            hashMap[nums[i]]=true // if the value is not in the hashmap
            
        }
    }
    return false
    
}; */

nums = [1,2,3,1]

const findDuplicates = (nums) => {
    return nums.length !== (new Set(nums)).size 
}