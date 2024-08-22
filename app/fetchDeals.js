import { db } from "../firebaseConfig"; // Adjust the import according to your Firebase configuration file
import { collection, getDocs, query, orderBy, startAfter, where, limit } from "firebase/firestore";

export const fetchDeals = async (params) => {
  const {
    tags,
    lastVisible,
    selectedSortOption,
    selectedDiscountOptions,
    isMoreDataAvailable,
  } = params;

  try {
    let dealsQuery;
    let filterConditions = [];
    const orderField = selectedSortOption || "dealTime";

    let hasDiscountFilter = selectedDiscountOptions.length > 0;

    if (hasDiscountFilter) {
      if (selectedDiscountOptions.includes("90% and above")) {
        filterConditions.push(where("discountPercentage", ">=", 90));
      } else if (selectedDiscountOptions.includes("80% and above")) {
        filterConditions.push(where("discountPercentage", ">=", 80));
      } else if (selectedDiscountOptions.includes("70% and above")) {
        filterConditions.push(where("discountPercentage", ">=", 70));
      } else if (selectedDiscountOptions.includes("60% and above")) {
        filterConditions.push(where("discountPercentage", ">=", 60));
      } else if (selectedDiscountOptions.includes("50% and above")) {
        filterConditions.push(where("discountPercentage", ">=", 50));
      }
      filterConditions.push(orderBy("discountPercentage", "desc"));
    }

    if (lastVisible && isMoreDataAvailable) {
      dealsQuery = query(
        collection(db, "deals"),
        ...(tags && tags.length > 0 ? [where("Tags", "array-contains-any", tags)] : []),
        ...filterConditions,
        orderBy(orderField, "desc"),
        startAfter(lastVisible),
        limit(10)
      );
    } else {
      dealsQuery = query(
        collection(db, "deals"),
        ...(tags && tags.length > 0 ? [where("Tags", "array-contains-any", tags)] : []),
        ...filterConditions,
        orderBy(orderField, "desc"),
        limit(10)
      );
    }

    const querySnapshot = await getDocs(dealsQuery);

    if (!querySnapshot.empty && querySnapshot.docs.length > 0) {
      const deals = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      return { deals, lastVisible: querySnapshot.docs[querySnapshot.docs.length - 1] };
    } else {
      return { deals: [], lastVisible: null };
    }
  } catch (error) {
    console.error("Error fetching deals:", error);
    throw error;
  }
};
