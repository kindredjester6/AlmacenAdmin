USE [Warehouse]
GO
/****** Object:  StoredProcedure [dbo].[spInsertarArticulo]    Script Date: 16/9/2023 06:13:23 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
ALTER PROCEDURE [dbo].[spInsertarArticulo] 	
		@inNombre VARCHAR(128)		-- Nuevo Nombre de articulo
	, @inPrecio MONEY				-- Nuevo Precio	
	,@inCodigo varchar(128)
	,@inClassName int
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;
	-- Se validan los datos de entrada, pues no estamos seguros que se validaron en capa logica.
	-- Validar que articulo exista.

	BEGIN TRY
		-- Inicia codigo en el cual se captura errores

		DECLARE @outResultCode int
		SET @outResultCode=0;  -- Por default codigo error 0 es que no hubo error

		IF NOT EXISTS (select 1 from Articulo A where A.Codigo = @inCodigo) and 
			exists(SELECT 1 FROM dbo.Articulo A WHERE LOWER(A.Nombre)=LOWER(@inNombre)) --Valida si no existe el articulo
		BEGIN

			DECLARE @ArtHabilitado int
			SET @ArtHabilitado = 1;
			INSERT [dbo].[Articulo] ( [Nombre]
									, [Precio]
									, Codigo
									, IdClaseArticulo
									, EsActivo
									)
					VALUES (@inNombre
							, @inPrecio
							, @inCodigo
							, @inClassName
							, @ArtHabilitado --= 1
						);
			SELECT @outResultCode as Result; -- Articulo creado
			RETURN;
		END;
		ELSE
			BEGIN
				if not EXISTS(select 1 from Articulo A where A.Codigo = @inCodigo)
					begin
						set @outResultCode = 50003; --Codigo de articulo exist
						select @outResultCode as result
						return;
					end
				else if not EXISTS(select 1 from Articulo A where A.Nombre = @inNombre)
					begin
						set @outResultCode = 50004; --Nombre de articulo exist
						select @outResultCode as result
						return;
					end
			END
	END TRY

	BEGIN CATCH

		IF @@TRANCOUNT>0  -- error sucedio dentro de la transaccion
		--BEGIN
		--	ROLLBACK TRANSACTION tUpdateArticulo; -- se deshacen los cambios realizados
		--END;
		INSERT INTO dbo.DBErrors	VALUES (
			SUSER_SNAME()
			, ERROR_NUMBER()
			, ERROR_STATE()
			, ERROR_SEVERITY()
			, ERROR_LINE()
			, ERROR_PROCEDURE()
			, ERROR_MESSAGE()
			, GETDATE()
		);

		Set @outResultCode=50005;
	
	END CATCH

	SET NOCOUNT OFF;

END
