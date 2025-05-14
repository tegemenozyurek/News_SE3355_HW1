using Microsoft.Data.Sqlite;
using System;

namespace DbSeeder
{
    public class SeedDatabase
    {
        public static void Main(string[] args)
        {
            // Path to the database
            string dbPath = @"C:\Users\Egeme\source\repos\NewsAPI\mydatabase.db";
            
            // Create connection string
            string connectionString = $"Data Source={dbPath}";
            
            using (var connection = new SqliteConnection(connectionString))
            {
                connection.Open();
                
                // Clear existing data
                using (var command = connection.CreateCommand())
                {
                    command.CommandText = "DELETE FROM SliderNews; DELETE FROM News;";
                    command.ExecuteNonQuery();
                    
                    command.CommandText = "DELETE FROM sqlite_sequence WHERE name='SliderNews'; DELETE FROM sqlite_sequence WHERE name='News';";
                    command.ExecuteNonQuery();
                    
                    // Insert SliderNews data
                    command.CommandText = @"
                    INSERT INTO SliderNews (Id, Title, Category, Description, ImageUrl) VALUES
                    (1, 'Fenerbahçe Yine 2.', 'Spor', 'Sarı-lacivertli ekip lig kupasına hasret', 'https://images.pexels.com/photos/17332414/pexels-photo-17332414.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'),
                    (2, 'Sevimli Pandalar Günlük Hayatlarında', 'Dünyadan Haberler', 'İki dev panda bambu yerken görüntülendi', 'https://images.pexels.com/photos/1123765/pexels-photo-1123765.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'),
                    (3, 'Siyasi Liderler Tartışma Platformunda', 'Politika', 'Liderler canlı yayında karşı karşıya geldi', 'https://images.pexels.com/photos/4666754/pexels-photo-4666754.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'),
                    (4, 'Stadyumda Coşkulu Anlar', 'Spor', 'Taraftarlar takımlarını desteklemek için stadyumu doldurdu', 'https://images.pexels.com/photos/3991877/pexels-photo-3991877.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'),
                    (5, 'Panda Yavrusu İlk Kez Kamerada', 'Dünyadan Haberler', 'Yeni doğan panda yavrusu ilk kez görüntülendi', 'https://images.pexels.com/photos/145939/pexels-photo-145939.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'),
                    (6, 'Seçim Kampanyaları Başladı', 'Politika', 'Partiler seçim kampanyalarına hız verdi', 'https://images.pexels.com/photos/4666753/pexels-photo-4666753.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'),
                    (7, 'Futbol Sezonu Açıldı', 'Spor', 'Yeni sezonun ilk maçında heyecan doruktaydı', 'https://images.pexels.com/photos/3991878/pexels-photo-3991878.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'),
                    (8, 'Panda Doğal Yaşam Alanında', 'Dünyadan Haberler', 'Panda doğal yaşam alanında görüntülendi', 'https://images.pexels.com/photos/145939/pexels-photo-145939.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'),
                    (9, 'Yeni Siyasi Reformlar Tartışılıyor', 'Politika', 'Hükümet yeni reform paketini açıkladı', 'https://images.pexels.com/photos/4666752/pexels-photo-4666752.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'),
                    (10, 'Taraftarlar Takımlarını Yalnız Bırakmadı', 'Spor', 'Maç boyunca tezahüratlar susmadı', 'https://images.pexels.com/photos/3991876/pexels-photo-3991876.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')";
                    command.ExecuteNonQuery();
                    
                    // Insert News data
                    command.CommandText = @"
                    INSERT INTO News (Id, Title, Category, Content) VALUES
                    (1, 'Siyaset Karisti', 'Politika', 'Siyaset cok ama cok fazla karisti'),
                    (2, 'Bomba Transfer', 'Spor', 'Bomba transfer bomba etkisi yapti'),
                    (3, 'Hastane Acildi', 'Sağlık', 'Japonyada yeni hastane acildi'),
                    (4, 'Yeni Huzur Evi', 'Sosyal', 'Evet harika bir huzur evi aciliyor')";
                    command.ExecuteNonQuery();
                }
                
                Console.WriteLine("Database seeding completed successfully!");
            }
        }
    }
} 