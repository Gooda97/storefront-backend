import client from "../database";


export type User = {
    id?: number;
    username: string;
    first_name: string;
    last_name: string;
    password: string;
  };

export class user_table {
    async index(): Promise<User[]> {
        try 
        {
            const conn = await client.connect();
            const sql = 'SELECT * FROM users';
        
            const result = await conn.query(sql);
        
            conn.release();
        
            return result.rows;
        } 
        catch (err) 
        {
            throw new Error(`unable to get users: ${err}`);
        } 
    }
    
    async show(id: number): Promise<User> 
    {
        try
        {
            const sql = 'SELECT * FROM users WHERE id=($1)'
            const conn = await client.connect()
        
            const result = await conn.query(sql, [id])
        
            conn.release()
        
            return result.rows[0]
        } 
        catch (err) 
        {
            throw new Error(`unable show the user wit id: ${id} .. ${err}`);
        }
    }

    async create(u: User): Promise<User> 
    {
        try 
        {
          const conn = await client.connect();
          const sql = 'INSERT INTO users (username, first_name, last_name, password) values ($1, $2, $3, $4) RETURNING *';
          const result = await conn.query(sql, [u.username, u.first_name, u.last_name, u.password]);
          const user = result.rows[0];
          conn.release();
          return user;
        } catch (err) 
        {
          throw new Error(`Unable to create a new user: ${err}`);
        }
    }
    
    async delete(id: number): Promise<User>
    {
        try 
        {
            const conn = await client.connect();
            const sql = 'DELETE FROM users WHERE id=($1)';
            
            const result = await conn.query(sql, [id])

            const user = result.rows[0]

            conn.release()

            return user
        }
        catch(err)
        {
          throw new Error(`unable delete user (${id}): ${err}`)
        }
    }
    
    async update (id: number, newdata: User): Promise<User> 
    {
        const {username, first_name, last_name, password} = newdata
    
        try 
        {
            const sql = "UPDATE users SET username = $1, first_name = $2, last_name= $3, password= $4 WHERE id = $5 RETURNING *"
            const conn = await client.connect()
            const result = await conn.query(sql, [username,first_name, last_name, password, id])
    
            const user = result.rows[0];

            conn.release()

            return user
        } 
        catch (err) 
        {
            throw new Error(`${err}`)
        }
    }
}

export default User;
    