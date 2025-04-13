
import { 
  PublicKey, 
  Transaction, 
  SystemProgram, 
  LAMPORTS_PER_SOL, 
  Connection 
} from '@solana/web3.js';

// Solana connection to devnet for better accessibility in development
const connection = new Connection(
  "https://api.devnet.solana.com",
  "confirmed"
);

// const QRCode = new Connection("");

/**
 * Transfers SOL from the user's wallet to a recipient address
 * 
 * @param wallet The connected Solana wallet
 * @param recipientAddress The recipient's Solana address
 * @param amount The amount of SOL to transfer
 * @returns The transaction signature
 */
export const transferSOL = async (
  wallet: any,
  recipientAddress: string,
  amount: number
): Promise<string> => {
  try {
    if (!wallet || !wallet.publicKey) {
      throw new Error("Wallet not connected");
    }

    console.log("Getting recent blockhash...");
    // Get recent blockhash
    const blockhash = await connection.getRecentBlockhash();
    console.log("Blockhash received:", blockhash.blockhash);
    
    // Create transaction
    const transaction = new Transaction().add(
      SystemProgram.transfer({
        fromPubkey: wallet.publicKey,
        toPubkey: new PublicKey(recipientAddress),
        lamports: amount * LAMPORTS_PER_SOL,
      })
    );
    
    // Set recent blockhash and fee payer
    transaction.feePayer = wallet.publicKey;
    transaction.recentBlockhash = blockhash.blockhash;
    
    console.log("Requesting transaction signature...");
    // Request transaction signature from the wallet
    const signedTransaction = await wallet.signTransaction(transaction);
    
    console.log("Sending transaction to network...");
    // Send the signed transaction to the network
    const signature = await connection.sendRawTransaction(
      signedTransaction.serialize()
    );
    
    console.log("Transaction sent, waiting for confirmation...");
    // Wait for confirmation
    await connection.confirmTransaction(signature);
    console.log("Transaction confirmed with signature:", signature);
    
    return signature;
  } catch (error) {
    console.error("Transfer failed:", error);
    throw error;
  }
};
