// types/jetinsight.d.ts

interface JetInsight {
    init: () => void;
    // Add other methods or properties as needed
  }
  
  declare global {
    interface Window {
      JetInsight?: JetInsight;
    }
  }
  
  export {};