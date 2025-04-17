using System.Transactions;
using Back.Data;
using Back.Models;
using Transaction = Back.Business.Transactions.Transaction;

namespace Back.Repositories.Transactions;

public class TransactionRepository(AppDbContext context) : BaseRepository<DbTransaction, Transaction, UpdateDbTransaction>(context);